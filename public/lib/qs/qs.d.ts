declare var Qs: Qs.prototype;

declare module Qs {
    interface  prototype{
        formats:Qs.formats;
        parse(e?: any,r?: any);
        stringify(e?: any,r?: any);
    }

    interface formats {
        default: "RFC3986", 
        formatters: Qs.formats_Methods,
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
    }
    interface formats_Methods {
        RFC1738(e);
        RFC3986(e);
    }
}

