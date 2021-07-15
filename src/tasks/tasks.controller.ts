import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.TasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.TasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.TasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.TasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.TasksService.updateTaskStatus(id, status);
  }
}
function getTaskById() {
  throw new Error('Function not implemented.');
}
