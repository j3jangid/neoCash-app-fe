import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const StartContext = createContext();

export const useGlobalContext = () => useContext(StartContext);

// Context provider component
export const ContextProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0)

    async function fetchWalletBalalce() {
        try {
            const response = await axiosInstance.get('/user/walletBalance')
            setWalletBalance(response.data.data)
        } catch (error) {
            console.error('error while Fetching Wallet Balace');
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            setLogin(true)

        } else {
            setLogin(false)
        }
    }, [])

    useEffect(() => {
        if (login) void fetchWalletBalalce()
    }, [login])

    return (
        <StartContext.Provider value={{ login, setLogin, walletBalance, fetchWalletBalalce }}>
            {children}
        </StartContext.Provider>
    );
};