import createHistory from "history/createBrowserHistory";

export const redirectToUserPage = (userType) => {
    const history = createHistory({
        //forceRefresh: true
        hashType: 'hashbang'
    });

    if (userType === 'supplier') {
        history.push({
            pathname: '/supplier',
        });
        window.location.reload()
    }

    if (userType === 'contractor') {
        history.push({
            pathname: '/contractor',
        });

        window.location.reload()
    }
};