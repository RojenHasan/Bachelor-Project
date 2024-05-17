import { Pressable, StyleSheet, Text, View } from 'react-native';

type SofaItemPros = {
    item: any;
    index: number;
};

const SofaItem = ({ item: sofa, index }: SofaItemPros) => {
    return (
        <Pressable style={styles.container}>
            <Text style={styles.index}>#{index + 1}</Text>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{sofa.name}</Text>
                <Text style={styles.subtitle}>{sofa.description}</Text>
                <Text style={styles.subtitle}>${sofa.price}</Text>
                

            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    index: {
        fontSize: 40,
        color: 'gray',
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gainsboro',
        marginVertical: 5,
    },
    subtitle: {
        color: 'gray',
    },
});

export default SofaItem;
