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

    const getPublicIP = async () => {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            // return ; // Example: "106.219.140.237"
            console.log('data.ip', data.ip);

        } catch (err) {
            console.error('Failed to fetch IP:', err);
            return null;
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            setLogin(true)
            getPublicIP()
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