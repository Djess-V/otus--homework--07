import * as dotenv from "dotenv";
import { getWeather } from "./getWeather";
import "./style/style.css";

dotenv.config();
getWeather(document.getElementById("app"));
