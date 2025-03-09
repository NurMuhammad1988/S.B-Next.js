"use client";
import { ChildProps } from "@/types";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";//convexni clerk bilan birga ishlatib beradiagn function

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);//NEXT_PUBLIC_CONVEX_UR <<bu .env.local failda convexni keyi yashirilgan text bu convex/>reactdan chaqirilgan ConvexReactClient functioni parametrida chaqirilishi kerak shunda to'g'ri ulanadi yani ConvexReactClient ichidagi functionlar convexda yaratilgan  env local ichida shu NEXT_PUBLIC_CONVEX_URL text ichida kelgan keyga ega convex serverni ishlatadi yani aynan osha convexdagi keyga ega serverni ishlatib beradigan function

export const ConvexClientProvider = ({ children }: ChildProps) => {
    return (
        <ClerkProvider
        // ClerkProvider bu @clerk/clerk-react dan chqirilgan component  bu componentham key bilan ishlaydi yani convexdagi serverni keyini kiritish shart >>> publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {/*ConvexProviderWithClerk componenti ichida //////////////////// bu>>> useAuth={useAuth} clerkni  componenti butun loyiha yani app yani children shu componentni ichida bo'lishi kerak ENDI BU LAYOUT.TSXDA ISHLATILISHI KERAK YANI loyihani ildiz yani asosiy papkasida ishlatilishi kerak bu faqat provider file */}
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
  
};
