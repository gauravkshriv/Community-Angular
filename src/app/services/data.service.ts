import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IQuestions} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private questionBehaviour = new BehaviorSubject<IQuestions>(null);

  question= this.questionBehaviour.asObservable();
  constructor() { }

  changeQuestion(question: IQuestions) {
    this.questionBehaviour.next(question)
  }

}
