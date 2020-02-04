import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "safe"
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string, args: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  constructor() {}
  transform(value: string[], args: string): any {
    if (!args || args == null || args === "" || value.find(x => x === args)) {
      return [];
    }
    return value
      .filter(x => x.toLowerCase().includes(args.toLowerCase()))
      .slice(0, 4);
  }
}
