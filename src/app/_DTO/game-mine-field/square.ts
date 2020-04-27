export class Square {
    IsBomb: boolean;
    IsVisible: boolean = false;
    WasClicked: boolean = false;
    SurroundingBombs: number;

    get Display(): string {
        if (!this.IsVisible) {
            return "";
        }

        if (this.IsBomb) {
            return "*";
        }

        return this.SurroundingBombs.toString();
    }

    get CustomClass(): string[] {
        var defaultClasses = ['square', 'button'];

        if (this.IsVisible == false) {
            return defaultClasses.concat('closed');
        }

        if (this.IsBomb) {
            if(this.WasClicked) { 
                return defaultClasses.concat('hit-bomb');
            }
            return defaultClasses.concat('exposed-bomb');
        }

        switch(this.SurroundingBombs)
        {
            case 0:
                return defaultClasses.concat('empty-square');

            case 1:
                return defaultClasses.concat('one-bomb');

            case 2:
                return defaultClasses.concat('two-bombs');

            case 3:
                return defaultClasses.concat('three-bombs');
                
            case 4:
                return defaultClasses.concat('four-bombs');

            case 5:
                return defaultClasses.concat('five-bombs');

            case 6:
                return defaultClasses.concat('six-bombs');

            case 7:
                return defaultClasses.concat('seven-bombs');

            case 8:
                return defaultClasses.concat('eight-bombs');
            }
        
        return defaultClasses;
    }
}
