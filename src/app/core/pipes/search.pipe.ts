import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject:any[], inputValue:string): any[] {
    return arrayOfObject.filter((i)=> i.title.toLowerCase().includes(inputValue.toLowerCase()) );
  }

}
