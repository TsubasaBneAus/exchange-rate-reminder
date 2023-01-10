import mysql.connector as db

# Execute a query to store exchange rate data to the database
def execute_query(host, user, password, database, json_data, rates):
    connection = db.connect(host=host, user=user, password=password, database=database)
    print(f"Database Connection: {connection.is_connected()}\n")
    cursor = connection.cursor()
    # query = "INSERT INTO exchangerate (afn, aud, jpy) VALUES (%s, %s, %s)"
    # values = (
    #     # json_data["timestamp"],
    #     # json_data["base"],
    #     # json_data["date"],
    #     # rates["AED"],
    #     # rates["AFN"],
    #     # rates["ALL"],
    #     1,
    #     1,
    #     1
    # )
    # values = (1, 1, 1)
    query = (
        "INSERT INTO exchangerate "
        "(time_stamp, base_currency, fetched_date, rate_aed, rate_afn, rate_all, rate_amd, rate_ang, rate_aoa, rate_ars, rate_aud, rate_awg, "
        "rate_azn, rate_bam, rate_bbd, rate_bdt, rate_bgn, rate_bhd, rate_bif, rate_bmd, rate_bnd, rate_bob, rate_brl, rate_bsd, rate_btc, rate_btn, "
        "rate_bwp, rate_byn, rate_byr, rate_bzd, rate_cad, rate_cdf, rate_chf, rate_clf, rate_clp, rate_cny, rate_cop, rate_crc, rate_cuc, rate_cup, "
        "rate_cve, rate_czk, rate_djf, rate_dkk, rate_dop, rate_dzd, rate_egp, rate_ern, rate_etb, rate_eur, rate_fjd, rate_fkp, rate_gbp, rate_gel, "
        "rate_ggp, rate_ghs, rate_gip, rate_gmd, rate_gnf, rate_gtq, rate_gyd, rate_hkd, rate_hnl, rate_hrk, rate_htg, rate_huf, rate_idr, rate_ils, "
        "rate_imp, rate_inr, rate_iqd, rate_irr, rate_isk, rate_jep, rate_jmd, rate_jod, rate_jpy, rate_kes, rate_kgs, rate_khr, rate_kmf, rate_kpw, "
        "rate_krw, rate_kwd, rate_kyd, rate_kzt, rate_lak, rate_lbp, rate_lkr, rate_lrd, rate_lsl, rate_ltl, rate_lvl, rate_lyd, rate_mad, rate_mdl, "
        "rate_mga, rate_mkd, rate_mmk, rate_mnt, rate_mop, rate_mro, rate_mur, rate_mvr, rate_mwk, rate_mxn, rate_myr, rate_mzn, rate_nad, rate_ngn, "
        "rate_nio, rate_nok, rate_npr, rate_nzd, rate_omr, rate_pab, rate_pen, rate_pgk, rate_php, rate_pkr, rate_pln, rate_pyg, rate_qar, rate_ron, "
        "rate_rsd, rate_rub, rate_rwg, rate_sar, rate_sbd, rate_scr, rate_sdg, rate_sek, rate_sgd, rate_shp, rate_sle, rate_sll, rate_sos, rate_srd, "
        "rate_std, rate_svc, rate_syp, rate_szl, rate_thb, rate_tjs, rate_tmt, rate_tnd, rate_top, rate_try, rate_ttd, rate_twd, rate_tzs, rate_uah, "
        "rate_ugx, rate_usd, rate_uyu, rate_uzs, rate_vef, rate_ves, rate_vnd, rate_vuv, rate_wst, rate_xaf, rate_xag, rate_xau, rate_xcd, rate_xdr, "
        "rate_xof, rate_xpf, rate_yer, rate_zar, rate_zmk, rate_zmw, rate_zwl) "
        "VALUES "
        "(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, "
        "%s, %s, %s, %s, %s, %s, %s)"
    )

    values = (
        json_data["timestamp"],
        json_data["base"],
        json_data["date"],
        rates["AED"],
        rates["AFN"],
        rates["ALL"],
        rates["AMD"],
        rates["ANG"],
        rates["AOA"],
        rates["ARS"],
        rates["AUD"],
        rates["AWG"],
        rates["AZN"],
        rates["BAM"],
        rates["BBD"],
        rates["BDT"],
        rates["BGN"],
        rates["BHD"],
        rates["BIF"],
        rates["BMD"],
        rates["BND"],
        rates["BOB"],
        rates["BRL"],
        rates["BSD"],
        rates["BTC"],
        rates["BTN"],
        rates["BWP"],
        rates["BYN"],
        rates["BYR"],
        rates["BZD"],
        rates["CAD"],
        rates["CDF"],
        rates["CHF"],
        rates["CLF"],
        rates["CLP"],
        rates["CNY"],
        rates["COP"],
        rates["CRC"],
        rates["CUC"],
        rates["CUP"],
        rates["CVE"],
        rates["CZK"],
        rates["DJF"],
        rates["DKK"],
        rates["DOP"],
        rates["DZD"],
        rates["EGP"],
        rates["ERN"],
        rates["ETB"],
        rates["EUR"],
        rates["FJD"],
        rates["FKP"],
        rates["GBP"],
        rates["GEL"],
        rates["GGP"],
        rates["GHS"],
        rates["GIP"],
        rates["GMD"],
        rates["GNF"],
        rates["GTQ"],
        rates["GYD"],
        rates["HKD"],
        rates["HNL"],
        rates["HRK"],
        rates["HTG"],
        rates["HUF"],
        rates["IDR"],
        rates["ILS"],
        rates["IMP"],
        rates["INR"],
        rates["IQD"],
        rates["IRR"],
        rates["ISK"],
        rates["JEP"],
        rates["JMD"],
        rates["JOD"],
        rates["JPY"],
        rates["KES"],
        rates["KGS"],
        rates["KHR"],
        rates["KMF"],
        rates["KPW"],
        rates["KRW"],
        rates["KWD"],
        rates["KYD"],
        rates["KZT"],
        rates["LAK"],
        rates["LBP"],
        rates["LKR"],
        rates["LRD"],
        rates["LSL"],
        rates["LTL"],
        rates["LVL"],
        rates["LYD"],
        rates["MAD"],
        rates["MDL"],
        rates["MGA"],
        rates["MKD"],
        rates["MMK"],
        rates["MNT"],
        rates["MOP"],
        rates["MRO"],
        rates["MUR"],
        rates["MVR"],
        rates["MWK"],
        rates["MXN"],
        rates["MYR"],
        rates["MZN"],
        rates["NAD"],
        rates["NGN"],
        rates["NIO"],
        rates["NOK"],
        rates["NPR"],
        rates["NZD"],
        rates["OMR"],
        rates["PAB"],
        rates["PEN"],
        rates["PGK"],
        rates["PHP"],
        rates["PKR"],
        rates["PLN"],
        rates["PYG"],
        rates["QAR"],
        rates["RON"],
        rates["RSD"],
        rates["RUB"],
        rates["RWF"],
        rates["SAR"],
        rates["SBD"],
        rates["SCR"],
        rates["SDG"],
        rates["SEK"],
        rates["SGD"],
        rates["SHP"],
        rates["SLE"],
        rates["SLL"],
        rates["SOS"],
        rates["SRD"],
        rates["STD"],
        rates["SVC"],
        rates["SYP"],
        rates["SZL"],
        rates["THB"],
        rates["TJS"],
        rates["TMT"],
        rates["TND"],
        rates["TOP"],
        rates["TRY"],
        rates["TTD"],
        rates["TWD"],
        rates["TZS"],
        rates["UAH"],
        rates["UGX"],
        rates["USD"],
        rates["UYU"],
        rates["UZS"],
        rates["VEF"],
        rates["VES"],
        rates["VND"],
        rates["VUV"],
        rates["WST"],
        rates["XAF"],
        rates["XAG"],
        rates["XAU"],
        rates["XCD"],
        rates["XDR"],
        rates["XOF"],
        rates["XPF"],
        rates["YER"],
        rates["ZAR"],
        rates["ZMK"],
        rates["ZMW"],
        rates["ZWL"],
    )

    cursor.execute(query, values)
    connection.commit()
    print("Records has been inserted!!\n")
    connection.close()
