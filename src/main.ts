import { fileService } from "@core/services/file.service";
import { appService } from "./lib/core/services/app.service";
import { testData } from "data/testData";

appService.init(document.body);
// testing
fileService.loadFile(testData);