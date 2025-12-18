function Banner2() {
    const handleClick = () => {
        window.location.href = "/Sale"
    }
    return (
        <div className="relative w-[98%] mx-auto max-w-[1700px]">
            <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fadvertisement%2FbottomBanner2%2FNaN?alt=media&token=9bffa94d-ff5d-4255-b738-7d3f727e2ab5f" alt="" className="w-full object-contain" onClick={handleClick} />
        </div>
    )
}

export default Banner2;