import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultConfig, previewConfigs, PREVIEW_STORAGE_KEY, type SiteConfig } from "@/config/site";

type Ctx = { config: SiteConfig; setPreview: (id: string) => void };
const ConfigContext = createContext<Ctx>({ config: defaultConfig, setPreview: () => {} });

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  // Preview presets are development-only; production always uses ChemCore defaults.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const id = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
    if (id && previewConfigs[id]) setConfig(previewConfigs[id]);
  }, []);

  const setPreview = (id: string) => {
    if (!import.meta.env.DEV || !previewConfigs[id]) return;
    window.localStorage.setItem(PREVIEW_STORAGE_KEY, id);
    setConfig(previewConfigs[id]);
  };

  return <ConfigContext.Provider value={{ config, setPreview }}>{children}</ConfigContext.Provider>;
}

export const useSiteConfig = () => useContext(ConfigContext);
