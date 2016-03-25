/* global Model */
'use strict';

if (!window.cam) {
    window.cam = {};
    if (!window.cam.service) {
        window.cam.service = {};
    }
}

window.cam.service.Paxalih = function() {
    var self = this;

    self._waYapataToKeyCode = {};
    self._gilaiPraongToKeyCode = {};
    self._camEFEOToKeyCode = {};
    self._KTTToKeyCode = {};
    self._uniCamKurToKeyCode = {};
    self._uniCamVNToKeyCode = {};

    //Valid chars
    self._validRumiChar = {};
    self._validInraChar = {};
    self._validKTTChar = {};

    //Keycode to Fonts
    self._keyCodeToWaYapata = {};
    self._keyCodeToGilaiPraong = {};
    self._keyCodeToCamEFEO = {};
    self._keyCodeToKTT = {};
    self._keyCodeToUniCamKur = {};
    self._keyCodeToUniCamVN = {};

    //Trans To Akhar Cam
    self._diipToMaTai = {};
    self._diipToTaKai = {};
    self._kanaingChars = {};
    self._kareiCrih = {};
    self._consonantKareiCrih = {};
    self._sappaohAngaok = {};
    self._sappaoh = {};
    self._takaiLikuk = {};
    self._vowelLangLikuk = {};
    self._takaiDaokLikuk = {};

    window.cam.service.Utility.SetKeyCodeData(self._waYapataToKeyCode, self._gilaiPraongToKeyCode, self._camEFEOToKeyCode, self._KTTToKeyCode, self._uniCamKurToKeyCode, self._uniCamVNToKeyCode,
        self._keyCodeToWaYapata, self._keyCodeToGilaiPraong, self._keyCodeToCamEFEO, self._keyCodeToKTT, self._keyCodeToUniCamKur, self._keyCodeToUniCamVN);

    window.cam.service.Utility.SetValidTransChar(self._validRumiChar, self._validInraChar, self._validKTTChar);

    self.InitTransToCamData = function(sourceType) {
        self._diipToMaTai = window.cam.service.Utility.InitDiipToMaTai();
        self._diipToTaKai = window.cam.service.Utility.InitDiipToTaKai(sourceType);
        self._kanaingChars = window.cam.service.Utility.InitKanaing();
        self._kareiCrih = window.cam.service.Utility.InitKareiCrih(sourceType);
        self._consonantKareiCrih = window.cam.service.Utility.InitConsonantKareiCrih();
        self._sappaohAngaok = window.cam.service.Utility.InitSapPaohAngaok();
        self._sappaoh = window.cam.service.Utility.InitSapPaoh();
        self._takaiLikuk = window.cam.service.Utility.InitTakaiLikuk();
        self._vowelLangLikuk = window.cam.service.Utility.InitVowelLangLikuk();
        self._takaiDaokLikuk = window.cam.service.Utility.InitTakaiDaokLikuk();
    };

    self.HuLanglikuk = function(list) {

        var count = list.length;
        if (count === 1 && self.IsVowels(list[0])) {
            return true;
        }

        if (count < 2) {
            return false;
        }
        if (list[count - 2] === Model.AKhar.Ak && list[count - 1] === Model.AKhar.Ak) {
            return false;
        }

        if (self.IsAkharDiip(list[count - 2]) && self.IsVowelLanglikuk(list[count - 1])) {
            return true;
        }

        return false;
    };

    self.IsVowels = function(akhar) {
        return akhar >= Model.AKhar.Ak && akhar <= Model.AKhar.Ok;
    };

    self.IsAkharDiip = function(akhar) {
        return akhar <= Model.AKhar.Ok;
    };

    self.IsConsonant = function(akhar) {
        return akhar <= Model.AKhar.SakPraong;
    };

    self.IsTakaiLikuk = function(akhar) {
        return self._takaiLikuk[akhar];
    };

    self.IsVowelLanglikuk = function(akhar) {
        return self._vowelLangLikuk[akhar];
    };

    self.Check_InaAkhar_PhuAm = function(sabaoh) {
        return sabaoh <= Model.AKhar.Ak;
    };

    self.IsAkharWakMaTai = function(sabaoh, index, count) {
        return sabaoh === Model.AKhar.Wak && index === count - 1;
    };

    self.Check_InaAkhar_PhuAm_Special = function(sabaoh) {
        var vowelSpecial = [Model.AKhar.Mâk, Model.AKhar.Nâk, Model.AKhar.Nyâk, Model.AKhar.Ngâk];
        return vowelSpecial.indexOf(sabaoh) !== -1;
    };

    self.Check_InaAkhar_NguyenAm = function(sabaoh) {
        return sabaoh >= Model.AKhar.Ik && sabaoh <= Model.AKhar.Ok;
    };

    self.Check_LangLiKuk = function(sabaoh) {
        var langlikuk = [Model.AKhar.Kak, Model.AKhar.Khak, Model.AKhar.Gak, Model.AKhar.Cak, Model.AKhar.Jak, Model.AKhar.Tak, Model.AKhar.Dak, Model.AKhar.Nâk, Model.AKhar.Nak,
            Model.AKhar.Pak, Model.AKhar.Bak, Model.AKhar.Mâk, Model.AKhar.Mak, Model.AKhar.Yak, Model.AKhar.Rak, Model.AKhar.Lak,
            Model.AKhar.Xak, Model.AKhar.Hak, Model.AKhar.PakPraong, Model.AKhar.SakPraong, Model.AKhar.Ak, Model.AKhar.Ik, Model.AKhar.Uk
        ];

        return langlikuk.indexOf(sabaoh) !== -1;
    };

    self.Check_AkharMatai = function(sabaoh) {
        return sabaoh >= Model.AKhar.KakMatai && sabaoh <= Model.AKhar.PaohDaNih || sabaoh === Model.AKhar.PaohNgâk;
    };

    self.Check_TakaiAkhar = function(sabaoh) {
        return sabaoh > Model.AKhar.Balau && sabaoh <= Model.AKhar.PaohNgâk;
    };

    self.Check_TakaiSapPaohLikuk = function(sabaoh) {
        var array = [Model.AKhar.TakaiKik, Model.AKhar.TakaiKikTutTakaiMâkDalem, Model.AKhar.TakaiThek,
            Model.AKhar.TakaiKuk, Model.AKhar.TakaiKâk, Model.AKhar.TraohAw, Model.AKhar.BalauTapong
        ];

        return array.indexOf(sabaoh) !== -1;
    };

    self.Check_TakaiSapPaohAnak = function(sabaoh) {
        return sabaoh === Model.AKhar.DarSa || sabaoh === Model.AKhar.DarDua;
    };

    self.Check_TakaiSapPaohDiLuic = function(sabaoh) {
        var array = [Model.AKhar.TakaiThekPaohNgâk, Model.AKhar.TakaiThekTutTakaiMâk,
            Model.AKhar.TakaiKikTutTakaiMâkLingiw, Model.AKhar.TakaiKikTutTakaiYak,
            Model.AKhar.TraohAwTutTakaiMâk, Model.AKhar.TraohAwPaohNgâk
        ];

        return array.indexOf(sabaoh) !== -1;
    };

    self.Check_TakaiAkharAnak = function(sabaoh) {
        return sabaoh === Model.AKhar.TakaiKrak;
    };

    self.Check_TakaiAkharLikuk = function(sabaoh) {
        var array = [Model.AKhar.TakaiKiak, Model.AKhar.TakaiKuak,
            Model.AKhar.TakaiKlak, Model.AKhar.TakaiKlakTakaiKuak, Model.AKhar.TakaiKlakTakaiKuk
        ];
        return array.indexOf(sabaoh) !== -1;
    };

    self.Check_Balau = function(sabaoh) {
        return sabaoh === Model.AKhar.Balau;
    };

    self.Check_Angka = function(sabaoh) {
        return sabaoh >= Model.AKhar.Sa && sabaoh <= Model.AKhar.Saoh;
    };

    self.Check_DauCau = function(sabaoh) {
        return sabaoh >= Model.AKhar.KanaingSa && sabaoh <= Model.AKhar.Square;
    };

    self.IsSapPaoh = function(akhar) {
        return self._sappaoh[akhar];
    };

    self.GetIndexAkharDiip = function(list) {
        for (var i = list.length - 1; i >= 0; i--) {

            var akhar = list[i];
            if (self.Check_InaAkhar_NguyenAm(akhar) || self.Check_InaAkhar_PhuAm(akhar)) {
                return i;
            }
        }

        return list.length;
    };

    self.GetIndexLastChar = function(list) {
        var ret = list.length - 1;
        for (var i = ret; i >= 0; i--) {

            var akhar = list[i];
            if (!self.Check_DauCau(akhar)) {
                ret = i;
                break;
            }
        }

        return ret;
    };
};
