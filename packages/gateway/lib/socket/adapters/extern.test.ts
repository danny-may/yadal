
import { describeFile } from "../../../../../root.test.util.js";

describeFile(async () => {
    await import('./extern.js');
});