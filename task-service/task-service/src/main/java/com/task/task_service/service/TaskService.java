package com.task.task_service.service;

import com.task.task_service.entity.Task;

import java.util.List;

public interface TaskService {

    Task createTask(Task task);

    Task getTaskById(Long id);

    List<Task> getTasksByUserId(Long userId);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);
}
