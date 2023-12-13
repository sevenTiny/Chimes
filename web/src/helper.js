class helper {
    /**
     * Get the height of the editor
     * @param {number} compensate
     * @returns {number}
     */
    static getEditorHeight(compensate) {
        if (!compensate)
            compensate = 0;

        // 减去顶部导航栏的高度以及底部的高度
        return window.innerHeight / 20 - 18 + compensate
    }
}

export default helper;