import React from 'react'
import SideBarModal from './SideBarModal'

const SideBar = () => {
    return (
        <SideBarModal isOpen={isOpen} onClose={closeModal}>

        </SideBarModal>
    )
}

export default SideBar