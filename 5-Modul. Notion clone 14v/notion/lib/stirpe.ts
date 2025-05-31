import Stripe from "stripe"

//stripe constructor

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil"
})

export default stripe