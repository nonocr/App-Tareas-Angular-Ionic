import { Injectable } from "@angular/core";
import { Tarea } from "../home/models/tarea.model";
 
const STORAGE_KEY = 'mis-tareas';
 
@Injectable({ providedIn: 'root' })
export class TareaService {
 
  private tareas: Tarea[] = [];
  private nextId = 1;
 
  constructor() {
    this.cargarDesdeStorage(); // Cargar al iniciar
  }
 
  private cargarDesdeStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.tareas = JSON.parse(data);
      // Restaurar el último ID
      this.nextId = this.tareas.reduce((max, t) => t.id > max ? t.id : max, 0) + 1;
    }
  }
 
  private guardarEnStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas));
  }
 
  // Obtener todas las tareas
  getTareas(): Tarea[] { return this.tareas; }
 
  // Agregar una nueva tarea
  agregarTarea(titulo: string, descripcion?: string) {
    this.tareas.push({
      id: this.nextId++,
      titulo,
      descripcion,
      completada: false,
      fechaCreacion: new Date()
    });
    this.guardarEnStorage();
    // Guardar después de cada cambio
  }
 
  // Marcar como completada / incompleta
  toggleTarea(id: number) {
    const t = this.tareas.find(t => t.id === id);
    if (t) {
      t.completada = !t.completada;
      this.guardarEnStorage();
    }
  }
 
  // Eliminar una tarea
  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.guardarEnStorage();
  }
}



