"use client"

const { createContext, useState } = require("react")

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div>
            <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
                {children}
            </ThemeContext.Provider>
        </div>
    )
}

export { ThemeContext, ThemeContextProvider }