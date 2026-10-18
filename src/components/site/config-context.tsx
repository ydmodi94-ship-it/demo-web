import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultConfig, previewConfigs, PREVIEW_STORAGE_KEY, resolveConfig, type SiteConfig } from "@/config/site";
import { categories } from "@/data/products";

type Ctx = { config: SiteConfig; setPreview: (id: string) => void };
const ConfigContext = createContext<Ctx>({ config: defaultConfig, setPreview: () => {} });

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  // Preview presets are development-only; production always uses ChemCore defaults.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    try { setConfig(resolveConfig(window.localStorage.getItem(PREVIEW_STORAGE_KEY), true)); } catch { /* Private browsing still supports in-memory switching. */ }
  }, []);

  const setPreview = (id: string) => {
    if (!import.meta.env.DEV || !previewConfigs[id]) return;
    try { window.localStorage.setItem(PREVIEW_STORAGE_KEY, id); } catch { /* Storage is optional. */ }
    setConfig(previewConfigs[id]);
  };

  return <ConfigContext.Provider value={{ config, setPreview }}><div data-sector={config.sector}>{children}</div></ConfigContext.Provider>;
}

export const useSiteConfig = () => useContext(ConfigContext);

export function useOrderedCategories() {
  const { config } = useSiteConfig();
  return config.categoryOrder.flatMap((slug) => categories.filter((category) => category.slug === slug));
}
