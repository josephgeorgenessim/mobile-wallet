import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useNavigation } from 'expo-router'
import { Alert, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '@/hooks/useTransactions'
import { useEffect, useState } from 'react'
import PageLoader from '@/components/pageLoader'
import { styles } from '@/assets/styles/home.styles'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BalanceCard } from '../../components/balanceCard'
import { FlatList } from 'react-native'
import { TransactionItem } from '../../components/TransactionCard'
import NoTransactionsFound from '../../components/NoTransactionsFound'

export default function Page() {
    const { user } = useUser()
    const { transactions, summary, loadData, loading, error, deleteTransaction } = useTransactions(user?.id)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await loadData()
        setRefreshing(false)
    }, [loadData])

    useEffect(() => {
        loadData()
    }, [loadData])
    const navigation = useNavigation()
    
    const handleDelete = (id) => {
        Alert.alert("Delete", "Are you sure you want to delete this transaction?", [
            {
                text: "Cancel",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: () => { deleteTransaction(id); loadData() },
                style: "destructive"
            }
        ])
    }

    if (loading && !refreshing) return <PageLoader />

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    {/* Left */}
                    <View style={styles.headerLeft}>
                        {/* Logo */}
                        <Image source={require('@/assets/images/logo.png')} style={styles.headerLogo} resizeMode='contain' />
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome ,</Text>
                            <Text style={styles.usernameText}>{user?.emailAddresses[0].emailAddress.split('@')[0]}</Text>
                        </View>
                    </View>
                    {/* Right */}
                    <View style={styles.headerRight}>
                        {/* Add Button */}
                        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('create')}>
                            <Ionicons name="add-circle" size={20} color="white" />
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                        {/* Logout Button */}
                        <SignOutButton />
                    </View>
                </View>

                {/* Balance Card */}
                <BalanceCard summary={summary} />

                {/* Transactions */}
                <View style={styles.transactionsHeaderContainer}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                </View>

            </View>
            <FlatList
                style={styles.transactionsList}
                contentContainerStyle={styles.transactionsListContent}
                data={transactions}
                renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
                ListEmptyComponent={<NoTransactionsFound />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    )
}