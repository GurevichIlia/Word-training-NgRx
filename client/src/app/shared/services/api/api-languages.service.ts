import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Language } from '../../interfaces';

export let BASE_URL;


BASE_URL = '';



@Injectable({
  providedIn: 'root'
})
export class ApiLanguagesService {

  constructor(private http: HttpClient) { }

  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${BASE_URL}/api/languages/getAllLanguages`);
  }

  getCurrentLanguage$() {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{ currentLang: Language }>(`${BASE_URL}/api/languages/getCurrentLanguage`).pipe(map(({ currentLang }) => currentLang), shareReplay());
  }

  getUserLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${BASE_URL}/api/languages/getUserLanguages`);
  }

  addLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(`${BASE_URL}/api/languages/createLanguage`, language);
  }

  addUserLanguages(languages: Language[]): Observable<Language[]> {
    return this.http.post<Language[]>(`${BASE_URL}/api/languages/addUserLanguages`, { userLanguages: languages });
  }

  editLanguage(language: Language): Observable<Language> {
    return this.http.patch<Language>(`${BASE_URL}/api/languages/editLanguage`, language);
  }

  deleteLanguage(languageId: string): Observable<Language[]> {
    return this.http.delete<Language[]>(`${BASE_URL}/api/languages/deleteLanguage/${languageId}`);
  }

  setCurrentLanguageOnServer(languageId: string) {
    return this.http.post<Language>(`${BASE_URL}/api/languages/setCurrentLanguage`, { currentLanguage: languageId });

  }

  deleteUserLanguage(languageId: string) {
    return this.http.post<Language>(`${BASE_URL}/api/languages/deleteUserLanguage`, { languageId });

  }
}
