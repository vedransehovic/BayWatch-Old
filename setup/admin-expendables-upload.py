from __future__ import print_function
import pickle
import os.path
import re
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

from firebase import firebase
firebase = firebase.FirebaseApplication('https://abelcine-baywatch.firebaseio.com/', None)


# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1pS7x8sIs24OYnHEyu4UYFjtS_DSUKg2IWNQJtMlpoJQ'
SAMPLE_RANGE_NAME = 'Sheet1!A2:E'

def main():
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'expend_sheets_credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('sheets', 'v4', credentials=creds)

    # Call the Sheets API
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=SAMPLE_RANGE_NAME).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
    else:
        print('Description, Cost, SKU, Type:')
        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            # print('%s, %s' % (row[0], row[1], row[2], row[3]))
            if len(row)>1:
                #for r in row:
                #    # str1 = re.sub(r'[ {2,},\t]', ' ', r)
                #    print('%s' % ( r ), end=', ')
                # print('')
                ritem = {
                    'name': row[0],
                    'price': row[1],
                    'code': row[2],
                    'cat': row[3]
                }
                print( ritem )

                firebase.post('/expendables', ritem)


if __name__ == '__main__':
    main()