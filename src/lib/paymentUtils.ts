import { DEV_ESEWA_API_URL } from "@/constants/api.constants";
import { HmacSHA256, enc } from "crypto-js";
import { v4 as uuid } from "uuid";

type EsewaPaymentProps = {
    amt: number;
    txAmt?: number;
    pdc?: number;
    psc?: number;
}

export const handleEsewaPayment = (formData: EsewaPaymentProps) => {
    let { amt, txAmt = 0, pdc = 0, psc = 0 } = formData;
    let totalAmt = amt + txAmt + pdc + psc;

    //Creating Hmac signature
    let transaction_uuid = uuid();
    let secretKey = "8gBm/:&EnhH.1/q";
    let message =
        `total_amount=${totalAmt},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;

    let hmac = HmacSHA256(message, secretKey);
    let hmacSignature = hmac.toString(enc.Base64);

    const path = DEV_ESEWA_API_URL;

    const params = {
        amount: amt,
        failure_url: "http://localhost:3000/payment/esewa-failure",
        product_delivery_charge: pdc,
        product_service_charge: psc,
        product_code: "EPAYTEST",
        signature: hmacSignature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3000/payment/esewa-success",
        tax_amount: txAmt,
        total_amount: totalAmt,
        transaction_uuid,
    };

    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (let key in params) {
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute(
            "value",
            params[key as keyof typeof params].toString()
        );
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();


};