import { create } from "zustand";
import { AxiosResponse } from "axios";
import { AxiosResponseMod } from "@/app/services/types";

interface TableData<T> {
    networkData?: AxiosResponseMod<T>
}

