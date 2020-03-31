import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private subject = new Subject<boolean>();
  private selectedStudent = new Subject<any[]>();



  // Selecionar o menu
  setMenu(isLoged: boolean) {
    this.subject.next(isLoged);
  }

  // Limpar a seleção
  unsetMenu() {
    this.subject.next();
  }

  // Obter o tipo de menu selecionado
  getMenu(): Observable<boolean> {
    return this.subject.asObservable();
  }

  setSelectedStudent(student) {
    this.selectedStudent.next(student);
  }

  unsetSelectedStudent() {
    this.selectedStudent.next();
  }

  getSelectedStudent(): Observable<any []> {
    return this.selectedStudent.asObservable();
  }


}
