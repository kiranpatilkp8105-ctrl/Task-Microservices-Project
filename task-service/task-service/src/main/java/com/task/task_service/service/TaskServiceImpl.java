package com.task.task_service.service;

import com.task.task_service.entity.Task;
import com.task.task_service.repository.TaskRepository;
import com.task.task_service.dto.UserDto;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final RestTemplate restTemplate;

    // ✅ Constructor Injection (BEST PRACTICE)
    public TaskServiceImpl(TaskRepository taskRepository, RestTemplate restTemplate) {
        this.taskRepository = taskRepository;
        this.restTemplate = restTemplate;
    }

    // ✅ CREATE TASK (User validation + save)
    @Override
    public Task createTask(Task task) {

        String url = "http://localhost:8085/users/" + task.getUserId();

        UserDto user = restTemplate.getForObject(url, UserDto.class);

        if (user == null) {
            throw new RuntimeException("User not found, cannot create task");
        }

        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    @Override
    public Task updateTask(Long id, Task task) {
        Task existing = getTaskById(id);

        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setStatus(task.getStatus());

        return taskRepository.save(existing);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
