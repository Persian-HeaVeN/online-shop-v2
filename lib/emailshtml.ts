export function WelcomeEmailHTML(name: string) {
	const welcomeHTML = `<html>
        <body style="background: #101820; width: 100%; color: white; display: grid; justify-items: center">
            <h1 style="text-align: center">
                Hello Dear <span style="color: #FEE715">${name}</span>, Welcome to <span style="color: #FEE715">Diamond Shop</span>
            </h1>
            <p style="font-weight: bold; text-align: center">
                Wish You a Good Shopping in Our Site
            <p/>
        </body>
    </html>`;
	return welcomeHTML;
}
