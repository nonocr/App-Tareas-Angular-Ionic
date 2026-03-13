export interface Tarea {
    id: number;
    titulo: string;
    descripcion?: string; // opcional
    completada: boolean;
    fechaCreacion: Date;
}