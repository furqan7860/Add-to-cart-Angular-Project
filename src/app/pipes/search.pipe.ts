import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "searchFilter"
})
export class SearchFilterPipe implements PipeTransform {
    transform(data: any[], searchText: string) {
        if (!searchText?.length) {
            return data;
        }
        const text = searchText.toLowerCase();
        return data.filter(cb => {
            return JSON.stringify(cb).toLowerCase().includes(text);
        });
    }
}