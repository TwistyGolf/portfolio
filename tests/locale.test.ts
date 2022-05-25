import { localeSignature } from "../src/localeLoader";
import { getLocaleDb } from "../src/localeLoader";
import { getText } from "../src/locale";
import { parseText } from "../src/stringParser";

jest.mock("../src/localeLoader");
jest.mock("../src/stringParser");

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
    getText("test1", "en");
    expect(getLocaleDb).toBeCalledTimes(1);
});

test("it loads the correct entry", () => {
    expect(getText("test1", "en")).toStrictEqual(mockDb.test1.en);
    expect(getText("test1", "es")).toStrictEqual(mockDb.test1.es);
    expect(getText("test2", "en")).toStrictEqual(mockDb.test2.en);
});

test("it parses text once", () => {
    getText("test1", "en");
    expect(parseText).toBeCalledTimes(1);
});
