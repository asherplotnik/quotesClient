// Global settings which are the same for development and production: 
class Globals {
}

// Global settings which are suitable only for development:
class DevelopmentGlobals extends Globals {
    public CLIENT_ID = "353449283448-1stna5h9vbqt3uq2oiarvj0hqn97pfr7.apps.googleusercontent.com";
    public DATA_AD_CLIENT = "ca-pub-7520811833523469"
    public DATA_AD_SLOT = "3002337120"
    public urls = {
        localUrl : "http://localhost:8080/api/v1/"
    };
}

// Global settings which are suitable only for production:
class ProductionGlobals extends Globals {
    public CLIENT_ID = "353449283448-1stna5h9vbqt3uq2oiarvj0hqn97pfr7.apps.googleusercontent.com";
    public DATA_AD_CLIENT = "ca-pub-7520811833523469"
    public DATA_AD_SLOT = "3002337120"
    public urls = {
        // products: "https://ashercouponsystem.herokuapp.com/api/products/", // In real life there will be the production address
        // couponImages:"https://ashercouponsystem.herokuapp.com/images/",
        localUrl : "https://ashersquotes.com/"
    };
}

// Creating the correct object
const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;
