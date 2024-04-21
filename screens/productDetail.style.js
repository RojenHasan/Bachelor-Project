import { StyleSheet } from "react-native";
import { SIZES , COLORS} from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: COLORS.lightWhite
    },
    upperRow:  {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: SIZES.xxLarge,
        width: SIZES.width -44,
        zIndex: 999
    },
    image: {
        width: '100%',
        height: '45%',
        resizeMode: "cover",
    },
    details: {
        marginTop: -SIZES.large,
        backgroundColor: COLORS.lightWhite,
        width: SIZES.width,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium
    },
    cartRow: {
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width -44,
    },
    titleRow: {
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width -44,
        top: 10
    },
    ratingRow: {
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width -10,
    },
    rating: {
        top: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal:SIZES.large
    },
    ratingText: {
        color: COLORS.gray,
        fontFamily:"medium",
        paddingHorizontal: SIZES.xSmall,
    },
    descriptionWrapper: {
        marginTop: SIZES.large *2,
        marginHorizontal: SIZES.large
    },
    description:  {
        fontFamily: 'medium',
        fontSize: SIZES.large -2
    },
    descText: {
        fontFamily: 'regular',
        fontSize: SIZES.small,
        textAlign: "justify",
        marginBottom: SIZES.small
    },
    location:  {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:COLORS.secondary,
        padding: 5,
        borderRadius: SIZES.large
    },
    title: {
        fontFamily: 'bold',
        fontSize: SIZES.large
    },
    price: {
        padding: 10,
        fontFamily: 'semibold',
        fontSize: SIZES.large
    },
    priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large
    }
})

export default styles;