BLACKLIST = [
    "192.168.1.250",
    "10.0.0.15",
    "45.67.89.100"
]


def detect_threat(event, ip=None):

    # Blacklisted IP Detection
    if ip in BLACKLIST:
        return {
            "threat_level": "Critical",
            "recommendation": "Blacklisted IP detected - Immediate action required"
        }

    if event == "failed_login":
        return {
            "threat_level": "High",
            "recommendation": "Possible brute-force attempt"
        }

    elif event == "multiple_failed_login":
        return {
            "threat_level": "Critical",
            "recommendation": "Immediate investigation required"
        }

    elif event == "admin_created":
        return {
            "threat_level": "High",
            "recommendation": "Verify admin account creation"
        }

    elif event == "password_change":
        return {
            "threat_level": "Low",
            "recommendation": "Monitor account activity"
        }

    elif event == "malware_detected":
        return {
            "threat_level": "Critical",
            "recommendation": "Isolate affected system immediately"
        }

    elif event == "port_scan":
        return {
            "threat_level": "Medium",
            "recommendation": "Possible reconnaissance activity"
        }

    elif event == "data_exfiltration":
        return {
            "threat_level": "Critical",
            "recommendation": "Potential data breach detected"
        }

    else:
        return {
            "threat_level": "Medium",
            "recommendation": "Review security event"
        }