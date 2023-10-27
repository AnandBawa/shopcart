import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeProviderContext } from "@/components/ThemeProvider";

// Theme Toggle icon and switch on click functionality
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useThemeProviderContext();

  return (
    <>
      <Button
        variant="ghost"
        className="px-2 transition-all ease-in hover:scale-105 hover:text-primary"
        onClick={toggleDarkTheme}
      >
        {isDarkTheme ? (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        )}
      </Button>
    </>
  );
};

export default ThemeToggle;
