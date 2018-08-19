import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {
    authToken: any;
    options;
    apiUrl: string;

    static get parameters() {
        return [Http];
    }

    constructor(private http: HttpClient) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000';
    }

    // Function to create headers, add token, to be used in HTTP requests
    createAuthenticationHeaders() {
        this.loadToken();
        // Headers configuration options
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authToken
            })
        });
    }

    // Function to get token from client local storage
    loadToken() {
        this.authToken = localStorage.getItem('token');
    }

    // get all products
    getAllProducts() {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        const searchUrl = `${this.apiUrl}/getProducts`;
        return this.http.get(searchUrl, this.options).pipe(map((response: any) => response.json()));
    }

    // get product by id
    getProductById(id) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        const searchUrl = `${this.apiUrl}/singleProduct/${id}`;
        return this.http.get(searchUrl, this.options).pipe(map((response: any) => response.json()));
    }

    // delete product
    deleteProductById(id) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        const searchUrl = `${this.apiUrl}/singleProduct?productId=${id}`;
        return this.http.delete(searchUrl, this.options).pipe(map((response: any) => response.json()));
    }

    // uupload image
    imageUpload(file) {
        const searchUrl = `${this.apiUrl}/imageUpload`;
        const headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data; boundary=------WebKitFormBoundary' + Math.random());
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({
            headers: headers
        });
        const formData = new FormData();
        formData.append('file', file[0]);
        return this.http.post(searchUrl, formData).pipe(map((response: any) => response.json()));
    }


    // upload multiple images
    moreImagesUpload(files) {
        const searchUrl = `${this.apiUrl}/moreImagesUpload`;
        const headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data; boundary=------WebKitFormBoundary' + Math.random());
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({
            headers: headers
        });
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('uploads[]', files[i], files[i]['name']);
        }
        return this.http.post(searchUrl, formData).pipe(map((response: any) => response.json()));
    }


    // add product
    addProduct(productData) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        const searchUrl = `${this.apiUrl}/addProduct`;
        productData.UpdatedBy = JSON.parse(localStorage.getItem('user'))['Email'];
        return this.http.post(searchUrl, productData, this.options).pipe(map((response: any) => response.json()));
    }

    // update product
    updateProduct(productData) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        const searchUrl = `${this.apiUrl}/updateProduct`;
        productData.UpdatedBy = JSON.parse(localStorage.getItem('user'))['Email'];
        return this.http.put(searchUrl, productData, this.options).pipe(map((response: any) => response.json()));
    }

    // add to cart
    addToCart(productId) {
        const searchUrl = `${this.apiUrl}/cart/add`;
        const data = { ProductId: productId, UserId: JSON.parse(localStorage.getItem('user'))['_id'] };
        return this.http.post(searchUrl, data, this.options).pipe(map((response: any) => response.json()));
    }
}
