/*jshint esversion: 8 */
function tabs(
    tabsSelector,
    tabsContentSelector,
    tabsParentSelector,
    activeClass
) {
    // T A B S
    const tabs = document.querySelectorAll(tabsSelector); // item'ы  Постное Фитнес Сбаланс
    const tabsParent = document.querySelector(tabsParentSelector); // Родитель item'ов
    const tabsContent = document.querySelectorAll(tabsContentSelector); // ТАБ

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;
