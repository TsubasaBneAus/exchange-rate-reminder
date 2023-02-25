from datetime import datetime
from zoneinfo import ZoneInfo
import mysql.connector as db

# Execute the query to get all user preferences
def execute_query(db_config):
    current_datetime = datetime.now(ZoneInfo("Asia/Tokyo")).strftime(
        "%Y-%m-%d %H:%M:%S %Z"
    )
    # Handle exception of "execute_query" function
    try:
        # Connect to the database
        connection = db.connect(
            host=db_config[0],
            port=db_config[1],
            user=db_config[2],
            password=db_config[3],
            database=db_config[4],
        )

        # List to store fetched records
        results = []

        # Get records from "UserPreference", "User" and "ExchangeRate" tables
        cursor = connection.cursor(buffered=True, dictionary=True)
        query_1 = "SELECT language, base, converted FROM UserPreference ORDER BY id"
        cursor.execute(query_1)
        results.append(cursor.fetchall())

        query_2 = "SELECT email FROM User ORDER BY id"
        cursor.execute(query_2)
        results.append(cursor.fetchall())

        query_3 = (
            "SELECT "
            "fetched_datetime, is_data_fetched, base_currency, rate_aed, rate_afn, rate_all, rate_amd, rate_ang, rate_aoa, rate_ars, rate_aud, rate_awg, "
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
            "rate_xof, rate_xpf, rate_yer, rate_zar, rate_zmk, rate_zmw, rate_zwl "
            "FROM ExchangeRate ORDER BY id DESC"
        )
        cursor.execute(query_3)
        results.append(cursor.fetchone())

        # Close the connection
        cursor.close()
        connection.close()

        return results

    except Exception:
        # Log that an error happened in db.py
        print(f"{current_datetime}: An error happened in db.py!")
        raise
