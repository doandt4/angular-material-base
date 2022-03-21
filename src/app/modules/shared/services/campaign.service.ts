import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConstant, CustomHttpErrorResponse } from '../../types';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Subject, throwError } from 'rxjs';
import { API_SHARED_TOKEN } from '../types';
import { PaymentOrder } from '../..';

@Injectable({
    providedIn: 'root',
})
export class CampaignService {
    url = `${this.apiConstant.endpoint}/campaign`;
    private errorsSub$ = new Subject<string[]>();

    public showDashboard = new BehaviorSubject<boolean>(true);
    showDashboard$ = this.showDashboard.asObservable();

    public userOfAgent = new BehaviorSubject<any>({});
    userOfAgent$ = this.userOfAgent.asObservable();

    public showCampaignSubmenu = new BehaviorSubject<boolean>(false);
    showCampaignSubmenu$ = this.showCampaignSubmenu.asObservable();

    public showReturn = new BehaviorSubject<boolean>(false);
    showReturn$ = this.showReturn.asObservable();

    public isToggleMenu = new BehaviorSubject<boolean>(false);
    isToggleMenu$ = this.isToggleMenu.asObservable();

    public dataCampaignEdit = new BehaviorSubject<any>({});
    dataCampaignEdit$ = this.dataCampaignEdit.asObservable();

    constructor(@Inject(API_SHARED_TOKEN) private apiConstant: ApiConstant, private http: HttpClient) {}

    private handleError(err: CustomHttpErrorResponse) {
        if (err.errorJson && err.errorJson.message) {
            this.errorsSub$.next(err.errorJson.message);
        } else {
            this.errorsSub$.next([err.message]);
        }
        return EMPTY;
    }

    getAllContinent() {
        const input = {};
        let response: any;
        return this.http.get(`${this.url}/all-continents`, input).pipe(
            tap(result => {
                response = result;
            }),
            map(() => {
                return response;
            }),
            catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
        );
    }

    getRegion() {
        let response: any;
        return this.http.get(`${this.url}/all-region`).pipe(
            tap(result => {
                response = result;
            }),
            map(() => {
                return response;
            }),
            catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
        );
    }
    getRegionAsync(): Promise<any> {
        let response: any;
        return this.http
            .get(`${this.url}/all-region`)
            .pipe(
                tap(result => {
                    response = result;
                }),
                map(() => {
                    return response;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    getCountry() {
        let response: any;
        return this.http.get(`${this.url}/all-country`).pipe(
            tap(result => {
                response = result;
            }),
            map(() => {
                return response;
            }),
            catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
        );
    }
    getCountryAsync(): Promise<any> {
        let response: any;
        return this.http
            .get(`${this.url}/all-country`)
            .pipe(
                tap(result => {
                    response = result;
                }),
                map(() => {
                    return response;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    getTarget(arrActive: any) {
        let response: any;
        const input = { lstActive: arrActive };
        return this.http.post(`${this.url}/get-target`, input).pipe(
            tap(result => {
                response = result;
            }),
            map(() => {
                return response;
            }),
            catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
        );
    }
    async getTargetnew(arrActive: any): Promise<any> {
        // let response: any;
        const input = { lstActive: arrActive };
        return this.http
            .post(`${this.url}/get-target`, input)
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    async getTargetDefault(arrActive: any): Promise<any> {
        // let response: any;
        const input = { lstActive: arrActive };
        return this.http
            .post(`${this.url}/get-target`, input)
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    async getConditionRules(lstRuleIds: any): Promise<any> {
        return this.http
            .post(`${this.url}/rule`, lstRuleIds)
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    getSummaryTarget(input: any) {
        let response: any;
        return this.http.post(`${this.url}/get-summary/`, input).pipe(
            tap(result => {
                response = result;
            }),
            map(() => {
                return response;
            }),
            catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
        );
    }
    async getSummaryTargetAsync(input: any): Promise<any> {
        let response: any;
        return this.http
            .post(`${this.url}/get-summary/`, input)
            .pipe(
                tap(result => {
                    response = result;
                }),
                map(() => {
                    return response;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    getAllRules() {
        return this.http.get(`${this.url}/all-rule`).pipe(
            tap(result => {
                return result;
            }),
            catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
        );
    }

    uploadFile(input: any) {
        let response: any;
        return this.http
            .post(`${this.url}/upload-file`, input, {
                responseType: 'text',
            })
            .pipe(
                tap(result => {
                    response = result;
                }),
                map(() => {
                    return response;
                }),
                catchError((err: CustomHttpErrorResponse) => throwError(err)),
            );
    }

    createNewCampaign(input: any) {
        let response: any;
        return this.http
            .post(`${this.url}/create`, input, {
                responseType: 'text',
            })
            .pipe(
                tap(result => {
                    response = result;
                }),
                map(() => {
                    return response;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            );
    }

    getCampaignDetail(idCampaign: string) {
        return this.http.get(`${this.url}/detail/${idCampaign}`).pipe(
            tap(result => {
                return result;
            }),
            catchError((err: CustomHttpErrorResponse) => throwError(err)),
        );
    }

    async getCampaignDetailAsync(idCampaign: string): Promise<any> {
        return this.http
            .get(`${this.url}/detail/${idCampaign}`)
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    async getListCampaign(userId: string, view: 'overview' | 'listCampaign'): Promise<any> {
        return this.http
            .post(`${this.url}/list-campaigns`, { userId: userId, view: view })
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    updateStatusCampaign(id: string, status: string) {
        return this.http
            .put(
                `${this.url}/update-status/${id}`,
                { status: status },
                {
                    responseType: 'text',
                },
            )
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            );
    }

    editCampaign(id: string, input: object) {
        return this.http.put(`${this.url}/edit/${id}`, input, { responseType: 'text' }).pipe(
            tap(result => {
                return result;
            }),
            catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
        );
    }
    createPaymentOrder(idCampaign: string, body: PaymentOrder) {
        return this.http
            .post(`${this.url}/create-payment-order/${idCampaign}`, body, {
                responseType: 'text',
            })
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            );
    }

    async getSlotAvailable(input: any): Promise<any> {
        let response: any;
        return this.http
            .post(`${this.url}/slot-available`, input)
            .pipe(
                tap(result => {
                    response = result;
                }),
                map(() => {
                    return response;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            )
            .toPromise();
    }

    updateSlotCampaign(id: string, slot: string) {
        return this.http
            .put(
                `${this.url}/update-status/${id}`,
                { slot: slot },
                {
                    responseType: 'text',
                },
            )
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            );
    }

    checkSlotAvailable(input: string[]) {
        return this.http
            .post(`${this.url}/check-slot-available`, input, {
                responseType: 'json',
            })
            .pipe(
                tap(result => {
                    return result;
                }),
                catchError((err: CustomHttpErrorResponse) => this.handleError(err)),
            );
    }
}
