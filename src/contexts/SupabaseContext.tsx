import { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { AirQualityReading } from "../types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

interface SupabaseContextType {
  fetchReadings: () => Promise<AirQualityReading[]>;
}

const SupabaseContext = createContext<SupabaseContextType | null>(null);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fetchReadings = async () => {
    const { data, error } = await supabase
      .from("air_quality_readings")
      .select("*")
      .order("timestamp", { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }
    return data as AirQualityReading[];
  };

  return (
    <SupabaseContext.Provider value={{ fetchReadings }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error("SupabaseContext missing");
  return ctx;
};
