import { Component, OnInit } from '@angular/core';
import { TareaService } from '../services/tarea';
import { Tarea } from './models/tarea.model';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
 
  tareas: Tarea[] = [];
  nuevaTarea = '';
  nuevaDesc = '';
  mostrarForm = false;
 
  constructor(private tareaService: TareaService) { }
 
  ngOnInit() {
    this.tareas = this.tareaService.getTareas();
  }
 
  agregar() {
    if (!this.nuevaTarea.trim()) return;
 
    this.tareaService.agregarTarea(this.nuevaTarea, this.nuevaDesc);
    this.nuevaTarea = '';
    this.nuevaDesc = '';
    this.mostrarForm = false;
  }
 
  toogle(id: number) {
    this.tareaService.toggleTarea(id);
  }
 
  eliminar(id:number) {
    this.tareaService.eliminarTarea(id);
  }
 
  pendientes(): number {
    return this.tareas.filter(t => !t.completada).length;
  }
}

