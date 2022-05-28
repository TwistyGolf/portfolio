import { localeSignature } from "../src/ts/localeLoader";
import { getLocaleDb } from "../src/ts/localeLoader";
import { getText } from "../src/ts/locale";
import { parseText } from "../src/ts/stringParser";

jest.mock("../src/ts/localeLoader");
jest.mock("../src/ts/stringParser");

const mockDb = {
    test1: {
        en: ["english"],
        es: ["spanish"],
    },
    test2: {
        en: ["english"],
        es: ["spanish"],
    },
};
beforeEach(() => {
    (getLocaleDb as jest.Mock).mockReturnValue(<localeSignature>mockDb);
    (parseText as jest.Mock).mockImplementation((input) => input);
});

afterEach(() => {
    (getLocaleDb as jest.Mock).mockClear();
    (parseText as jest.Mock).mockClear();
});

test("it loads a localeDb", () => {
    getText("test1");
    expect(getLocaleDb).toBeCalledTimes(1);
});

test("it loads the correct entry", () => {
    expect(getText("test1")).toStrictEqual(mockDb.test1.en);
    expect(getText("test2")).toStrictEqual(mockDb.test2.en);
});

test("it parses text once", () => {
    getText("test1");
    expect(parseText).toBeCalledTimes(1);
});
