export default class Color {
    static getByIndex(index) {
        const BASE_COLORS = [
            "f00", "00f", "0f0", "ff0", "0ff", "f0f",
            "07f", "0f7", "70f", "7f0", "f07", "f70",
            "04f", "0f4", "40f", "4f0", "f04", "f40",
            "0af", "0fa", "a0f", "af0", "f0a", "fa0",
            "02f", "0f2", "20f", "2f0", "f02", "f20",
            "0cf", "0fc", "c0f", "cf0", "f0c", "fc0",
            "04f", "0f4", "40f", "4f0", "f04", "f40",
            "0af", "0fa", "a0f", "af0", "f0a", "fa0",
            "02f", "0f2", "20f", "2f0", "f02", "f20",
            "0cf", "0fc", "c0f", "cf0", "f0c", "fc0",
            "37c", "3c7", "73c", "7c3", "c37", "c73",
            "37f", "3f7", "73f", "7f3", "f37", "f73",
            "07c", "0c7", "70c", "7c0", "c07", "c70",
        ];
        const str_color = BASE_COLORS[index % BASE_COLORS.length];
        function strToNum(s) {
            let x = ("0" <= s && s <= "9")
                ? s.charCodeAt(0) - "0".charCodeAt(0)
                : s.charCodeAt(0) - "a".charCodeAt(0) + 10;
            return 16 * x + x;
        }
        return new Color(
            strToNum(str_color[0]),
            strToNum(str_color[1]),
            strToNum(str_color[2]));
    }

    static mix(colors) {
        let normalizeValue = v => Math.pow(v / 255, 2.2);
        let denormalizeValue = v => Math.round(255 * Math.pow(v, 1 / 2.2));
        const multiplier = 1 / colors.length;
        let sr = 0, sg = 0, sb = 0;
        for (let color of colors) {
            sr += normalizeValue(color.r);
            sg += normalizeValue(color.g);
            sb += normalizeValue(color.b);
        }
        return new Color(
            denormalizeValue(sr * multiplier),
            denormalizeValue(sg * multiplier),
            denormalizeValue(sb * multiplier));
    }

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    asString(alpha=0) {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha.toFixed(3)})`;
    }
}
