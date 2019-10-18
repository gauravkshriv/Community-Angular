import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'myDate'})
export class DatePipe implements PipeTransform {
  transform(value, args:string[]) : any {
    return value.split("@")[0];
  }
}

