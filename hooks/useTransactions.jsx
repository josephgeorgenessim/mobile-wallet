import { useCallback, useState } from "react"
import { Alert } from "react-native"


export const useTransactions = (userId) => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL

    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0
    })

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/transactions/${userId}`)
            const data = await response.json()
            setTransactions(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [userId])

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/api/transactions/summary/${userId}`)
            const data = await response.json()
            setSummary(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [userId])


    const loadData = useCallback(async () => {
        if (!userId) return
        try {
            setLoading(true)
            await Promise.all([
                fetchTransactions(),
                fetchSummary()
            ])
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [fetchTransactions, fetchSummary, userId])


    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/transactions/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Failed to delete transaction')
            }
            await loadData()
            Alert.alert('Transaction deleted successfully')
        } catch (error) {
            setError(error)
            Alert.alert('Failed to delete transaction')
        }
    }

    return {
        transactions,
        loading,
        error,
        summary,
        loadData,
        deleteTransaction
    }
}
