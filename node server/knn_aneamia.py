import sys
import json
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
import pandas as pd


df = pd.read_csv(r"C:\Users\nemal\OneDrive\Documents\folder12\hematology\anemia data from Kaggle - Copy.csv")
df_1 = pd.read_csv(r"C:\Users\nemal\OneDrive\Documents\folder12\hematology\anemia data from Kaggle1.csv")


def train_and_predict(classifier,X_train,y_train,X_test,test_case):
    classifier.fit(X_train, y_train)
    y_pred = classifier.predict(X_test)
    predicted_outcome = classifier.predict([test_case])
    return predicted_outcome[0]


def main():
    test_case = [int(sys.argv[1]), float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), float(sys.argv[5])]
    x = df.drop(["Result"], axis=1).values
    y = df["Result"].values
    X_train,X_test,y_train,y_test = train_test_split(x,y,test_size=0.3,random_state=42)

   
    knn_classifier = KNeighborsClassifier(n_neighbors=3)
    knn_result = train_and_predict(knn_classifier,X_train,y_train,X_test,test_case)

    
    gnb_classifier = GaussianNB()
    gnb_result = train_and_predict(gnb_classifier,X_train,y_train,X_test,test_case)

  
    rf_classifier = RandomForestClassifier(n_estimators=100,random_state=42)
    rf_result = train_and_predict(rf_classifier,X_train,y_train,X_test,test_case)

    
    svm_classifier = SVC(kernel='linear', C=1)
    svm_result = train_and_predict(svm_classifier,X_train,y_train,X_test,test_case)

    
    lr_classifier = LogisticRegression()
    lr_result = train_and_predict(lr_classifier,X_train,y_train,X_test,test_case)

   
    dt_classifier = DecisionTreeClassifier(random_state=42)
    dt_result = train_and_predict(dt_classifier,X_train,y_train,X_test,test_case)

    tolerance=1
    df_rounded = df.round(decimals=6)
    test_case_rounded = [round(val, 6) for val in test_case]
    match_index = df_rounded[df_rounded[df_rounded.columns[:-1]].apply(lambda row: all(abs(row - test_case_rounded) < tolerance), axis=1)].index

    if not match_index.empty:
        gt_result = int(df.loc[match_index[0], "Result"])
    else:
        gt_result = 2

    result = {
        "k-Nearest Neighbors": int(knn_result),
        "Gaussian Naive Bayes": int(gnb_result),
        "Random Forest": int(rf_result),
        "Support Vector Machine": int(svm_result),
        "Logistic Regression": int(lr_result),
        "Decision Tree": int(dt_result),
        "GroundTruth": int(gt_result)
    }
    sys.stdout.write(json.dumps({"response": result}))


def inaccurate():
    test_case = [int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[5])]
    x = df.drop(["Result","MCH","MCHC"], axis=1).values
    y = df["Result"].values
    X_train, X_test, y_train, y_test = train_test_split(x,y,test_size=0.3,random_state=42)


    knn_classifier = KNeighborsClassifier(n_neighbors=3)
    knn_result = train_and_predict(knn_classifier,X_train,y_train,X_test,test_case)


    gnb_classifier = GaussianNB()
    gnb_result = train_and_predict(gnb_classifier,X_train,y_train,X_test,test_case)


    rf_classifier = RandomForestClassifier(n_estimators=100,random_state=42)
    rf_result = train_and_predict(rf_classifier,X_train,y_train,X_test,test_case)

  
    svm_classifier = SVC(kernel='linear')
    svm_result = train_and_predict(svm_classifier,X_train,y_train,X_test,test_case)


    lr_classifier = LogisticRegression()
    lr_result = train_and_predict(lr_classifier,X_train,y_train,X_test,test_case)


    dt_classifier = DecisionTreeClassifier(random_state=42)
    dt_result = train_and_predict(dt_classifier,X_train,y_train,X_test,test_case)

    tolerance=1
    df_rounded = df_1.round(decimals=6)
    test_case_rounded = [round(val, 6) for val in test_case]
    match_index = df_rounded[df_rounded[df_rounded.columns[:-1]].apply(lambda row: all(abs(row - test_case_rounded) < tolerance), axis=1)].index

    if not match_index.empty:
        gt_result = int(df_1.loc[match_index[0], "Result"])
    else:
        gt_result = 2

    result = {
        "k-Nearest Neighbors": int(knn_result),
        "Gaussian Naive Bayes": int(gnb_result),
        "Random Forest": int(rf_result),
        "Support Vector Machine": int(svm_result),
        "Logistic Regression": int(lr_result),
        "Decision Tree": int(dt_result),
        "GroundTruth": int(gt_result)
    }
    sys.stdout.write(json.dumps({"response": result}))



if __name__ == "__main__":
    if(int(sys.argv[6])==0):
        main()
#        for value in sys.argv[1:]:
#            if float(value) not in df.values:
#                 return 0
#        return 1
    else:
        inaccurate()