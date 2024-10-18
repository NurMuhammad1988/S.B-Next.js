"use client"
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../ui/modal";

export default function RegisterModal() {
    const RegisterModal = useRegisterModal();//qo'lda yozilgan shaxsiy hook

    const body = <div>Body content</div>;

    const footer = <div>Footer content</div>;

    return (
        <Modal
            title="Create an account"
            body={body}
            footer={footer}
            isOpen={RegisterModal.isOpen}//RegisterModal o'zgaruvchida chaqirilgan useRegisterModal nomli qo'lda yozilgan hookni statelari huddi usestatega o'hshaydi yani modal.tsxdagi isOpenga boolean typi berilgan va useRegisterModaldagi isOpenga esa false berilgan yani boshod modal false bo'lib turadi onclose esa modal.tsxda void function qilib berilgan useRegisterModalda esa is openni false qilishi aytilgan state shunda
            onClose={RegisterModal.onClose}//RegisterModal o'zgaruvchida chaqirilgan useRegisterModal nomli qo'lda yozilgan hookni statelari huddi usestatega o'hshaydi

        />
    );
}
