import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start();

export const scanNfc = async () => {
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();
        return tag;
    } catch (error) {
        console.warn("NFC error: ", error);
    } finally {
        NfcManager.cancelTechnologyRequest();
    }
};